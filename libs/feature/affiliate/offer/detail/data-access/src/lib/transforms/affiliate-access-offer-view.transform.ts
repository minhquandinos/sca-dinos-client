import { AffiliatePostbackListModel } from '@scaleo/affiliate/postback/list/data-access';
import { AffiliateAccessOfferViewModel } from '@scaleo/feature/affiliate/offer/detail/data-access';
import { OfferGoalCapModel } from '@scaleo/feature/manager/offer/goal/common';
import { ExtendedTargetingInterface, GoalOfferModel } from '@scaleo/offer/common';
import { PlatformListsFormatInterface, PlatformListsInterface } from '@scaleo/platform/list/access-data';
import { Util } from '@scaleo/utils';

export class AffiliateAccessOfferViewTransform {
    static transformModel(offerData: AffiliateAccessOfferViewModel, platformList: PlatformListsInterface): AffiliateAccessOfferViewModel {
        const currency = platformList.currencies.find((item) => item?.code === offerData?.currency);
        const timezone = platformList.timezones.find((item) => item.timezone === offerData?.timezone);

        // const links = offerData.links
        //     ? AffiliateAccessOfferViewTransform.transformLinks(offerData.links, platformList.offer_urls_types)
        //     : [];
        const goals = offerData.goals ? AffiliateAccessOfferViewTransform.transformGoals(offerData.goals, platformList) : [];
        const postbacks = offerData.postbacks
            ? AffiliateAccessOfferViewTransform.transformPostbacks(offerData.postbacks, platformList)
            : [];

        const extendedTargeting = offerData.extended_targeting
            ? AffiliateAccessOfferViewTransform.transformExtendedTargeting(
                  offerData.extended_targeting,
                  platformList.offers_targeting_rules
              )
            : [];

        return {
            ...offerData,
            currency_name: currency ? currency.title : '',
            timezone: timezone ? timezone.title.replace(' &amp;', ',') : '',
            // links,
            extended_targeting: extendedTargeting,
            goals,
            postbacks,
            tracking_domain: offerData.tracking_domain
        };
    }

    static transformExtendedTargeting(
        extendedTargeting: ExtendedTargetingInterface[],
        offersTargetingRules: PlatformListsFormatInterface[]
    ): any {
        return extendedTargeting.map((ex) => {
            const searchRule = offersTargetingRules.find((rul) => ex.type === rul.id);
            return {
                ...ex,
                search_rule: searchRule ? searchRule.key : ''
            };
        });
    }

    static transformGoals(goals: GoalOfferModel[], platfromList: PlatformListsInterface): GoalOfferModel[] {
        return goals.map((item: GoalOfferModel) => {
            const trackingMethod = platfromList.goal_tracking_methods.find((method) => method.id === item.tracking_method)?.title;
            return Util.cloneObject(item, {
                tracking_method_title: trackingMethod || '',
                caps: AffiliateAccessOfferViewTransform.transformCaps(item.caps, platfromList.goals_caps_periods)
            });
        });
    }

    static transformPostbacks(
        postbacks: AffiliatePostbackListModel[],
        platformLists: PlatformListsInterface
    ): AffiliatePostbackListModel[] {
        return postbacks.map((item) => {
            const findLevel = item.level_id ? platformLists.postback_levels.find((level) => +level.id === +item.level_id) : null;

            let typeName = null;
            if (item.type !== 0) {
                typeName = platformLists.postback_tracking_methods.find((type) => +type.id === +item.type);
                typeName = typeName ? `list_table_${typeName.title.split(' ')[0]}` : null;
            }
            return {
                ...item,
                level_id: +item.level_id,
                conversion_status: +item.conversion_status,
                level_name: findLevel ? findLevel.title : null,
                type_name: typeName,
                get offerName(): string {
                    return item?.offer_name || '';
                },
                get goalName(): string {
                    return item?.goal_name || '';
                }
            } as AffiliatePostbackListModel;
        });
    }

    static transformCaps(caps: OfferGoalCapModel[], platformCapsPeriods: PlatformListsFormatInterface[]): OfferGoalCapModel[] {
        return caps
            ? caps.map((cap: OfferGoalCapModel) => ({
                  ...cap,
                  periodAsString: platformCapsPeriods?.find((p) => p.id === cap.period)?.title
              }))
            : [];
    }
}

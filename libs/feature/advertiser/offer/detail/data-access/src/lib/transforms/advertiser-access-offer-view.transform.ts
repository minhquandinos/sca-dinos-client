import { OfferGoalCapModel } from '@scaleo/feature/manager/offer/goal/common';
import { ExtendedTargetingInterface, GoalOfferModel } from '@scaleo/offer/common';
import { PlatformListsFormatInterface, PlatformListsInterface } from '@scaleo/platform/list/access-data';
import { Util } from '@scaleo/utils';

import { AdvertiserAccessOfferViewModel } from '../models/advertiser-access-offer-view.model';

export class AdvertiserAccessOfferViewTransform {
    static transformModel(offerData: AdvertiserAccessOfferViewModel, platformList: PlatformListsInterface): AdvertiserAccessOfferViewModel {
        const currency = platformList.currencies.find((item) => item?.code === offerData?.currency);
        const timezone = platformList.timezones.find((item) => item.timezone === offerData?.timezone);

        // const links = offerData.links
        //     ? AffiliateAccessOfferViewTransform.transformLinks(offerData.links, platformList.offer_urls_types)
        //     : [];
        const goals = offerData.goals ? AdvertiserAccessOfferViewTransform.transformGoals(offerData.goals, platformList) : [];

        const extendedTargeting = offerData.extended_targeting
            ? AdvertiserAccessOfferViewTransform.transformExtendedTargeting(
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
            tracking_domain: offerData.tracking_domain
            // tags: offerData.tags,
            // tags_selected: offerData.tags_selected,
            // traffic_types_selected: offerData.traffic_types_selected,
            // ask_approval_questions: +offerData.ask_approval_questions
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
                caps: AdvertiserAccessOfferViewTransform.transformCaps(item.caps, platfromList.goals_caps_periods)
            });
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

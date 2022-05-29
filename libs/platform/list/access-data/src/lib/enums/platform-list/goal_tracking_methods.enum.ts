export enum GoalTrackingMethodIdEnum {
    Postback = 1,
    Iframe = 2,
    JsPixel = 3,
    ImgPixel = 4
}

export enum GoalTrackingMethodTranslateEnum {
    Postback = 'goal_tracking_methods.postback_cookieless',
    Iframe = 'goal_tracking_methods.iframe_pixel_cookie-based',
    JsPixel = 'goal_tracking_methods.javascript_pixel_cookie-based',
    ImgPixel = 'goal_tracking_methods.img_pixel_cookie-based'
}

# Actual web client preview

This fixture imports components and CSS directly from the sibling `../Plural/web`
and the `../Plural/client` protocol package. Product source is not modified.

Run `npm run preview:build` after updating the sibling checkout. The generated
`public/product-preview` files are self-contained and ship with the landing;
deploying the landing does not require the sibling repository or a live host.

The top bar, feed, composer and site Canvas use real product components. Session
data and the sample website are fixtures. This is a passive animation: all input
is disabled, and the hero Pause button also pauses the embedded timeline.
No credentials, network sessions or model calls are used.

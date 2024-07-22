// ==UserScript==
// @name         scrap shoppy.mn product data
// @namespace    http://tampermonkey.net/
// @version      2024-07-22
// @description  try to take over the world!
// @author       You
// @match        https://shoppy.mn/products/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=shoppy.mn
// @grant        none
// ==/UserScript==

(function () {
    "use strict";
    window.addEventListener(
        "load",
        function () {
            console.clear();
            const productDisplayName = document.getElementsByTagName("h3").length !== 0 ? document.getElementsByTagName("h3")[0].textContent : "";
            const productName =
                document.getElementsByClassName("sub-title").length !== 0 ? document.getElementsByClassName("sub-title")[0].textContent : "";
            const price = Number(document.getElementById("id-product-detail-selling-price").textContent.match(/\d/g).join(""));
            const description =
                document.getElementsByClassName("sc-1rf1nel-0 dkbsHj").length !== 0
                    ? document.getElementsByClassName("sc-1rf1nel-0 dkbsHj")[0].textContent
                    : "";
            console.log({ productDisplayName, productName, price, description });
        },
        false
    );
})();

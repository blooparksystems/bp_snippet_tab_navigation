/**
 * Created by Itsab on 15.10.14.
 */

(function () {

    [].slice.call(document.querySelectorAll('.tabs')).forEach(function (el) {
        new tab_nav_selector(el);
    });

})()
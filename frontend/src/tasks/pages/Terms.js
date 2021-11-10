import React from 'react';

import './Terms.css';

const Terms = () => {

    function agreeWithTerms() {
        let check = document.getElementById('agree');
        let submitBtn = document.getElementById('enableBtn');
        // when unchecked or checked, run the function
        check.onchange = function () {
            if (this.checked) {
                submitBtn.disabled = false;
            } else {
                submitBtn.disabled = true;
            }
        }
    }

    return (
        <form action="/" className="terms-form">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras semper, est in malesuada
                sollicitudin, sem quam consequat felis, a cursus dui leo sit amet tellus. Ut cursus, mauris vitae
                varius commodo, dolor risus consequat ante, vitae dignissim enim eros vitae elit. Pellentesque
                ultrices vulputate lectus, luctus tempor orci volutpat non. Cras fringilla felis urna. Vestibulum
                nisi ligula, lacinia ut aliquam nec, bibendum ac dolor. Aenean vulputate, massa non sollicitudin
                tempus, turpis risus egestas tortor, a faucibus ex magna vel ante. Sed congue elit erat. Class
                aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus ac
                sapien arcu.

                Suspendisse nec ante ac metus consequat vehicula nec et felis. Quisque non dui ac lorem malesuada
                sodales. Aliquam erat volutpat. Duis semper vulputate justo, at tempus sapien vulputate nec. Donec
                ut tellus elit. Curabitur ut tellus vel dolor sodales finibus. Duis pharetra laoreet ipsum, sed
                sodales eros mattis id. Aliquam semper malesuada lorem, sit amet eleifend diam elementum nec. Nullam
                commodo mauris in turpis tincidunt aliquam. Integer in dignissim metus. Class aptent taciti sociosqu
                ad litora torquent per conubia nostra, per inceptos himenaeos. Proin ullamcorper semper erat, sit
                amet lacinia metus varius viverra. Vestibulum tempus, magna sodales faucibus efficitur, tellus ipsum
                tristique nibh, eget mollis enim dui eu magna. Phasellus sit amet gravida ex. Phasellus cursus,
                sapien in aliquet accumsan, augue nulla viverra lorem, quis vestibulum tortor erat non justo.
                Quisque mollis metus rutrum, venenatis sapien eget, blandit risus.

                Aenean pretium aliquam viverra. Ut sit amet tempus massa. Aenean luctus metus nulla, in gravida nunc
                cursus ac. Nulla eu pharetra mauris. Proin cursus suscipit efficitur. Cras sollicitudin et massa id
                molestie. Fusce in tincidunt felis. Aenean tincidunt eleifend eleifend. Ut ultricies tristique
                tellus ac iaculis. Maecenas ut tincidunt magna. Morbi mollis commodo dapibus.
            </p>
            <p>Agree <input type="checkbox" id="agree" onClick={agreeWithTerms}/></p>
            <input type="submit" name="enableBtn" disabled="disabled" id="enableBtn"
                   value=" SUBMIT "/>
        </form>
    );
};

export default Terms;

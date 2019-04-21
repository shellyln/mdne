// Copyright (c) 2019 Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln



export const MenuItem = ({icon, caption, onClick}) => {
    return (lsx`
        (li (a (@ (href "#!")
            (onClick ${onClick}) )
            (i (@ (className "material-icons")) ${icon})
            ${caption} ))`
    );
};


export const MenuDivider = () => {
    return (lsx`(li (@ (className "divider") (tabIndex -1)))`);
};


export const Switch = ({caption, offText, onText, elClass, checked, onClick}) => {
    return (lsx`
        (div (@ (className ("switch" ${elClass ? elClass : ''})))
            (label ${caption})(br)
            (label
                ${offText}
                (input (@ (type "checkbox")
                            (checked ${checked})
                            (onClick ${onClick}) ))
                (span  (@ (className "lever")))
                ${onText} ))`
    );
};

export const getImageSize = ({version,theme,toggleComponent}) => {
    if(version === "v1" && theme === "one" && toggleComponent === "hero_section_images"){
        return `(h=530,w=316) px`

    } else if (version === "v2" && theme === "one" && toggleComponent === "hero_section_images"){
        return `(h=571,w=389) px .png format`

    } else if (version === "v3" && theme === "one" && toggleComponent === "hero_section_images"){
        return `(h=589,w=685) px`
    } else if (version === "v3" && theme === "two" && toggleComponent === "hero_section_images"){
        return `(1st image 529x380, 2nd image 136x367)px`
    } else if (version === "v3" && theme === "three" && toggleComponent === "hero_section_images"){
        return `(h=766,w=554) px`
    }
};
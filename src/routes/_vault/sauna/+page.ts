import type { PageLoad } from './$types';

export const load: PageLoad = () => {
    const saunaGallery: VaultGallery = {
        position: "none",
        images: [
            { src: "01.jpg", alt: "Sauna Plan", title: "The wood shed with the sauna plan, including the correct stove and bench layout" },
            { src: "02.jpg", alt: "First delivery", title: "First delivery of materials, framing, decking, etc" },
            { src: "03.jpg", alt: "Concrete footings poured", title: "6 footing pads filled with concrete to make a solid foundation for the floor" },
            { src: "04.jpg", alt: "Floor construction", title: "The floor frame, levelled and sitting on blocks" },
            { src: "05.jpg", alt: "Floor boards going in", title: "Testing the fit of the floor boards (don't worry there were more noggins in the end)" },
            { src: "06.jpg", alt: "Floor complete!", title: "The finished floor, a nice solid foundation for the sauna to sit on" },
            { src: "07.jpg", alt: "Wall framing in progress", title: "Wall framing back and sides in progress" },
            { src: "08.jpg", alt: "Wall framing back and sides done", title: "Wall framing back and sides done, with the front framing started" },
            { src: "09.jpg", alt: "Front framing done with door opening", title: "Front framing done with door opening, and insulation started" },
            { src: "10.jpg", alt: "Outer insulation layer going on", title: "Outer insulation layer (roofing underlay) in progress" },
            { src: "10_0.jpg", alt: "Outer insulation continuned", title: "Wrapped like a burrito" },
            { src: "10_1.jpg", alt: "Fiberglass insulation and vapor barrier in progress", title: "You can see the moisture barrier and the fiberglass insulation" },
            { src: "11.jpg", alt: "Fiberglass insulation and vapor barrier", title: "All secured and in place" },
            { src: "12.jpg", alt: "The sauna stove arrived!", title: "The sauna stove arrived! It looks great!" },
            { src: "13.jpg", alt: "Wall paneling in progress, and extra netting on the ceiling to support the insulation", title: "Wall paneling in progress, and extra netting on the ceiling to support the insulation" },
            { src: "14.jpg", alt: "Ceiling paneling in progress", title: "Ceiling paneling in progress" },
            { src: "16_1.jpg", alt: "Walls and ceiling paneling almost there", title: "Walls and ceiling paneling almost there" },
            { src: "16.jpg", alt: "Walls and ceiling paneling done", title: "Walls and ceiling paneling done" },
            { src: "16_2.jpg", alt: "Bench construction (1/3)", title: "Bench construction (1/3)" },
            { src: "16_3.jpg", alt: "Bench construction (2/3)", title: "Bench construction (2/3)" },
            { src: "16_4.jpg", alt: "Bench construction (3/3)", title: "Bench construction (3/3)" },
            { src: "17.jpg", alt: "Formwork for stove base", title: "The formwork with concrete for the concrete foot pad" },
            { src: "18.jpg", alt: "Stove base cured", title: "The concrete foot pad cured and ready to paint" },
            { src: "19.jpg", alt: "Door construction (1/4)", title: "Door inside" },
            { src: "20.jpg", alt: "Door construction (2/4)", title: "Door outside" },
            { src: "21.jpg", alt: "Door construction (3/4)", title: "Door outside completed" },
            { src: "22.jpg", alt: "Door construction (4/4)", title: "Door inside completed" },
            { src: "23.jpg", alt: "Door installed, inside view", title: "Door installed, inside view" },
            { src: "24.jpg", alt: "Door installed, outside view", title: "Door installed, outside view" },
            { src: "26.jpg", alt: "Ventilation port", title: "Ventilation port in the opposite top corner from the stove" },
            { src: "27.jpg", alt: "Stove, fire/heat barrier and chimney in progress", title: "Stove, fire/heat barrier and chimney in progress" },
            { src: "28.jpg", alt: "Metal ceiling shield cut and painted for chimney", title: "Metal ceiling shield cut and painted for chimney" },
            { src: "29.jpg", alt: "Custom roof flashing for chimney beat to match profile", title: "Custom roof flashing for chimney beat to match profile" },
            { src: "30.jpg", alt: "First stove fire! (and chimney smoke test)", title: "First stove fire! (and chimney smoke test)" },
            { src: "31.jpg", alt: "Roof with chimney being power-washed", title: "Roof with chimney being power-washed" },
            { src: "32.jpg", alt: "Finished construction, view from the woodshed", title: "Finished construction, view from the woodshed" },
            { src: "33.jpg", alt: "Finished construction, inside the door", title: "Finished construction, inside the door" },
            { src: "34.jpg", alt: "Finished construction, view from the bench", title: "Finished construction, view from the bench" },
            { src: "36.jpg", alt: "Woodshed setup up and sauna exterior oiled", title: "Woodshed setup up and sauna exterior oiled" },
            { src: "38.jpg", alt: "View at night with lanterns", title: "View at night with lanterns" },
            { src: "39.jpg", alt: "Time to enjoy the sauna!", title: "Time to enjoy the sauna!" },
        ]
    };
    const saunaProject: VaultPageProps = {
        title: "Building a Sauna ♨️🔥",
        date: new Date('2025-01-08'),
        excerpt: "A visual tour of our sauna construction process",
        feature_image: {
          src: "33.jpg",
          alt: "Our very own sauna",
          title: "Our very own sauna"
        },
        gallery: saunaGallery
    };
    return {
        props: saunaProject
    };
};

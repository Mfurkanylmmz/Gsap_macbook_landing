// import { create } from "zustand";

// const useMacbookStore = create((set) => ({
//     // MODEL
//     selectedModel: "16",
//     setSelectedModel: (model) =>
//         set({
//             selectedModel: model,
//             scale: model === "14" ? 0.06 : 0.08,
//         }),

//     // COLOR
//     color: { name: "Dark", value: "#2e2c2e" },
//     setColor: (color) => set({ color }),

//     // SCALE (otomatik modelden geliyor ama yine de tutuyoruz)
//     scale: 0.08,

//     // RESET
//     reset: () =>
//         set({
//             selectedModel: "16",
//             scale: 0.08,
//             color: { name: "Dark", value: "#2e2c2e" },
//         }),
// }));

// export default useMacbookStore;

import { create } from "zustand";


const useMacbookStore = create((set) => ({
    color: { name: "Dark", value: "#2e2c2e" },

    selectedModel: "16",

    setColor: (color) => set({ color }),
    setSelectedModel: (model) => set({ selectedModel: model }),

    texture: '/videos/feature-1.mp4',
    setTexture: (texture) => set({ texture }),

    reset: () =>
        set({
            color: { name: "Dark", value: "#2e2c2e" },
            selectedModel: "16",
            texture: '/videos/feature-1.mp4',
        }),
}));

export default useMacbookStore;


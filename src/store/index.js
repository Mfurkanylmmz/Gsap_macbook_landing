import { create } from "zustand";

const useMacbookStore = create((set) => ({
    color: { name: "Dark", value: "#2e2c2e" },
    setColor: (color) => set({ color }),

    scale: 0.08,
    setScale: (scale) => set({ scale }),

    reset: () => set({ color: '#2e2c2e', scale: 0.08 })





}))
export default useMacbookStore


// import { create } from "zustand";

// const useMacbookStore = create((set) => ({
//     selectedModel: "16",

//     color: {
//         name: "Dark",
//         value: "#2e2c2e"
//     },

//     setColor: (color) => set({ color }),

//     setSelectedModel: (selectedModel) => set({ selectedModel }),

//     reset: () =>
//         set({
//             selectedModel: "16",
//             color: {
//                 name: "Dark",
//                 value: "#2e2c2e"
//             }
//         })
// }))

// export default useMacbookStore


const images = import.meta.glob('/src/images/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
})
function getImageUrl(fileName) {
    const entry = Object.entries(images).find(([path]) => path.endsWith(`/${fileName}`))
    return entry?.[1] ?? ''
}

const CARD_IMAGES = [
    {
        url: getImageUrl('images/01.jpeg'),
        altText: 'Банан',
    },
    {
        url: getImageUrl('images/02.jpeg'),
        altText: 'Авокадо',
    },
    {
        url: getImageUrl('images/03.jpeg'),
        altText: 'Ежик:)',
    },
    {
        url: getImageUrl('images/04.jpeg'),
        altText: 'Фрукт экзотический',
    },
    {
        url: getImageUrl('images/05.jpeg'),
        altText: 'Почти слива',
    },
    {
        url: getImageUrl('images/06.jpeg'),
        altText: 'Яблоко',
    },
    {
        url: getImageUrl('images/07.jpeg'),
        altText: 'Грейпфрут',
    },
    {
        url: getImageUrl('images/08.jpeg'),
        altText: 'Лайм',
    }
]

export { CARD_IMAGES }
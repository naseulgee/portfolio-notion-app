export default {
    namespaced: true,
    state: () => ({
        name: 'Seul Gee',
        contact: {
            Email: {
                icon: ['fas', 'envelope'],
                content: 'mailto:thwndglgkwk@naver.com'
            },
            Blog: {
                icon: ['fab', 'blogger-b'],
                content: 'https://blog.naver.com/nseulgee'
            },
            Github: {
                icon: ['fab', 'github'],
                content: 'https://github.com/naseulgee'
            },
        },
    })
}
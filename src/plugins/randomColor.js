export default {
    install(app) { // app.use 에 전달되어 바로 작동한다
        app.config.globalProperties.$randomColor = (satuation = 100, ligntness = 100, alpha = 1) => {
            return `hsla(${Math.floor(Math.random() * 100)}, ${satuation}%, ${ligntness}%, ${alpha})`
        }
    }
}
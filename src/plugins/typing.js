export default {
    install(app) { // app.use 에 전달되어 바로 작동한다
        app.config.globalProperties.$typing = (target, letters = [], speed = 100) => {
            if(letters.length == 0) return

            // 전달받은 작성 위치 내용 지우기
            target.innerHTML = ''
            // 깜빡이는 커서 세팅
            const cursor = document.createElement('span')
            cursor.style = 'margin-left: 0.2em; border-right: 0.1em solid;'
            const keyframes = [{ opacity: 0 }, { opacity: 1 }]
            const options = {
                duration: 900,
                easing: "steps(2)",
                iterations: Infinity,
            }
            cursor.animate(keyframes, options)
            target.parentNode.insertBefore(cursor, target.nextSibling)

            // 타이핑 효과
            let i = 0
            const typing = async () => {
                const letter = letters[i].split('')

                while (letter.length) {
                    await wait(speed)
                    target.innerHTML += letter.shift()
                }

                // 잠시 대기
                await wait(800)

                // 지우는 효과
                remove()
            }

            // 글자 지우는 효과
            const remove = async () => {
                const letter = letters[i].split('')

                while (letter.length) {
                    await wait(speed)

                    letter.pop()
                    target.innerHTML = letter.join('') 
                }
                
                // 다음 순서의 글자로 지정, 타이핑 함수 다시 실행
                i = !letters[i+1] ? 0 : i + 1
                typing()
            }

            // 딜레이 기능 ( 마이크로초 )
            const wait = ms => {
                return new Promise(res => setTimeout(res, ms))
            }

            // 초기 실행
            setTimeout(typing, 1500)
        }
    }
}
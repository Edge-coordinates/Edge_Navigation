async function fun() {
    const a = getasyncthin("2", 2000).then(e => console.log(e))
    const b = getasyncthin("1", 1000).then(e => console.log(e))
    const c = getasyncthin("3", 3000).then(e => console.log(e))
    console.log('begin')
    await Promise.all([a, b, c])
    console.log("end")
}

async function fun2() {
    console.log('begin')
    await getasyncthin("2", 2000).then(e => console.log(e))
    await getasyncthin("1", 1000).then(e => console.log(e))
    await getasyncthin("3", 3000).then(e => console.log(e))
    
    // await Promise.all([a, b, c])
    console.log("end")
}

function getasyncthin(a, time) {
    return new Promise((resolve, _reject) => {
        setTimeout(() => {
            resolve(a)
        }, time)
    })
}

// fun()

fun2()

// fun()

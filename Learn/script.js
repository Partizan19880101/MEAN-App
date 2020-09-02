

let arr = Array(1, 2, 4, 5, 6)
let k = Object.keys(arr)
for (let index = 0; index < k.length; index++) {
    const element = k[index];
    console.log(element + '=>' + arr[k[index]])
}
let arr = Array(1, 2, 4, 5, 6)
for(let key in arr) {
    console.log(key + ' => ' + arr[key])
}
// Таблица умножения
let table = new Array(10)
for (let i = 0; i < table.length; i++) {
    table[i] = new Array(10)
}

for (let row = 0; row < table.length; row++) {
    
    for (let col = 0; col < table[row].length; col++) {
        table[row][col] = row*col    
    }
    
}console.log(table.reverse())
// Конец таблицы умножения
// создание часов
function displayTime() {
    let now = new Date()
    //let div = document.getElementById('#clock')
    //div.innerHTML = now.toLocaleDateString()
    //setTimeout(displayTime, 1000)
    console.log(now.toLocaleTimeString())
}
displayTime();









// all Prod  TASK_ID: "35253"
// Re-run 1 (free): 2 days after the premiere in a different slot to the previous airings. (2714_heavycheckmark) 
// Re-run 2 (free): 3 days after the premiere in a different slot to the previous airings.  (2714_heavycheckmark) 
// 2nd run (cost): 4 days after the premiere in a different slot to the previous airings.  (2714_heavycheckmark) 
// Re-run 2-1 (free): 6 days after the premiere in a different slot to the previous airings. (274c_crossmark) 
// Re-run 2-2 (free): 7 days The same slot (2714_heavycheckmark) 
// 3rd run (cost): 13 days  overnight (274c_crossmark) 
// Re-run 1 (free). 21 days overnight (274c_crossmark) 

// 1. Поcле Move in Settings, контент остается в Premier
// https://app.asana.com/0/1138018827521165/1184048576734235   Assignee by Nina



// 2. [Pluto - Placement]  Падает запрос create_task(500 статус код)
// https://app.asana.com/0/1138018827521165/1189854412731209/f" Assignee by Maxim D

// 3. PLUTO DAILY/WEELKY необходимо выравнить total 
// https://app.asana.com/0/1175092148267322/1189318435621651" Assignee by  Antonovich

// 4. [Weekly metrics] наложение графиков
// https://app.asana.com/0/1175092148267322/1189249631401603" Assignee by  Antonovich

// 5. {Bug} DEV/UAT [AVOD] [Settings - Common] не удаляется дата премьеры
// https://app.asana.com/0/1138018827521165/1189854412731209/f Assignee by  Antonovich

// 6. {BUG}DEV[AVOD] доступна кнопка Flight Settings во время сохранения изменений 
// https://app.asana.com/0/1138018827521165/1189890448703809/f

// 7. {BUG}DEV/UAT[AVOD][Settings - Flight Settings] на timeline не отображается по эпизодам 3th flight
// https://app.asana.com/0/1138018827521165/1189854412731217/f

// 8. {Bug} [Settings - Acquired] Ошибка при нажатии кнопки Settings без Start date
// https://app.asana.com/0/1175092148267322/1190058699075105
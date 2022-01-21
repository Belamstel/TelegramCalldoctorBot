import fetch from "node-fetch";
import {data, TICKET, URL} from "./config.js";

let taskList = []
export async function getList () {
    let result = ''
    const response = await fetch(URL, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json', 'TICKET': TICKET}
    });
    const res = await response.json();

    let arr = []
    res.data.forEach(function (x, i) {
        arr.push(' ' + x.visitDate + ' ' + x.family + ' ' + x.name + ' ' + x.patronymic + ' ' + x.complaint + ' ' + x.address.addressString + '\n')
    })

    for (let i = 0; i < arr.length; i++) {
        result = result + `[${i + 1}] ${arr[i]}\n`
    }
    console.log(1);
    console.log(arr);


    return result
}

export function addTask(text) {
    taskList.push(text)
}

export function deleteTask(id) {
    taskList.splice(id, 1)
}









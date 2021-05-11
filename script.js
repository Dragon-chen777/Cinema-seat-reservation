const container = document.querySelector(".seat-container")
const seats = document.querySelectorAll(".row .seat:not(.occupied)")
const count = document.getElementById("count")
const totalPrice = document.getElementById("totalPrice")
const movieSelect = document.getElementById("movie")

let ticketPrice = +movieSelect.value; // 45

// 保存选中的电影索引和价格到localStorage
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem("selectedMovieIndex", movieIndex)
    localStorage.setItem("selectedMoviePrice", moviePrice)
}
// 更新总选中座位数和价钱
function updateSelectedCount() {
    // 获取所有选中的座位
    const selectedSeats = document.querySelectorAll(".row .seat.selected") 
    // 在可选定的座位中,获取选中座位的索引
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat)) 
    // 存储座位
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex)) 
    const selectedSeatsCount = selectedSeats.length 

    count.innerText = selectedSeatsCount 
    totalPrice.innerText = selectedSeatsCount * ticketPrice 

    setMovieData(movieSelect.selectedIndex, movieSelect.value) 
}
// 从localStorage获取数据并填充UI  (可以忽略)
function populateUI() {
    // ???
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) 
    if (selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected")// ???
            }
        })
    }
    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex") 
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex 
    }
}
updateSelectedCount()
populateUI();
// 电影选中事件
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value
    setMovieData(e.target.selectedIndex, e.target.value)
    updateSelectedCount()
})
// 座位点击事件
container.addEventListener("click", e => {
    // 冒泡
    if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
        e.target.classList.toggle("selected")
        updateSelectedCount()
    }
})
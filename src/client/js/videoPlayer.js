const videoElement = document.getElementById("videoContainer")

// console.log("뭐나와? : ", videoElement.dataset)
// console.log("뭐나와? : ", videoElement)

let playCount = 0
let isPlaying = false
const id = videoElement.dataset.id

const 시작 = () => {
  if (!isPlaying) {
    isPlaying = true
    playCount++
    console.log("재생상태:", isPlaying)
    console.log("재생횟수:", playCount)
  }
}

const 일시정지했을때 = () => {
  if (isPlaying) {
    isPlaying = false
    --playCount
    console.log("재생상태:", isPlaying)
    console.log("재생횟수:", playCount)
  }
}

const end = async () => {
  if (!isPlaying) {
    playCount++
    console.log("재생상태:", isPlaying)
    console.log("재생횟수:", playCount)
    console.log(`비디오 재생 수: ${playCount}`)

    // fetch(`/videos/${id}`, {
    //   method: "POST",
    //   body: playCount,
    // }).then(console.log("전송완"))
  }
  await fetch(`/api/videos/${id}/view`, {
    method: "POST",
    body: JSON.stringify({ playCount }),
  })
}

// videoElement.addEventListener("loadedmetadata", 핸들러)
// videoElement.addEventListener("play", 핸들러)

videoElement.addEventListener("play", 시작)
videoElement.addEventListener("pause", 일시정지했을때)
videoElement.addEventListener("ended", end)

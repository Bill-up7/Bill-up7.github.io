/* ========================
   PAGE FLIP LOGIC
   ======================== */

const pages = document.querySelectorAll('.page')
const navbar = document.getElementById('navbar')
const hint = document.getElementById('hint')
const leftBase = document.getElementById('leftBase')

let currentPage = 0
const total = pages.length

// Maps each navbar button index to how many pages should be flipped
const navToFlipCount = [0, 1, 2, 3, 4, 5]

function updateNav() {
  // Show navbar after first flip
  if (currentPage > 0) {
    navbar.classList.add('visible')
  } else {
    navbar.classList.remove('visible')
  }

  // Highlight active nav button
  const buttons = navbar.querySelectorAll('button')
  buttons.forEach((btn, i) => {
    btn.classList.toggle('active', navToFlipCount[i] === currentPage)
  })

  // Left click zone — only show when there's somewhere to go back to
  document.getElementById('clickLeft').style.display = currentPage > 0 ? 'block' : 'none'

  // Left base page — show after first flip so there's a cream page behind flipped pages
  leftBase.style.display = currentPage > 0 ? 'block' : 'none'

  // Hint fades out after first flip
  hint.style.opacity = currentPage === 0 ? '1' : '0'
}

function nextPage() {
  if (currentPage < total) {
    pages[currentPage].classList.add('flipped')
    currentPage++
    updateNav()
  }
}

function prevPage() {
  if (currentPage > 0) {
    currentPage--
    pages[currentPage].classList.remove('flipped')
    updateNav()
  }
}

function goToPage(navIndex) {
  const target = navToFlipCount[navIndex]
  if (target > currentPage) {
    while (currentPage < target) nextPage()
  } else if (target < currentPage) {
    while (currentPage > target) prevPage()
  }
}

document.getElementById('clickRight').addEventListener('click', nextPage)
document.getElementById('clickLeft').addEventListener('click', prevPage)

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') nextPage()
  if (e.key === 'ArrowLeft') prevPage()
})

// Set initial state
updateNav()

/* ========================
   COVER TYPING EFFECT
   ======================== */

const words = ['Developer', 'Designer', 'Programmer']
let wordIndex = 0
let charIndex = 0
const typingEl = document.getElementById('typing')

function type() {
  if (!typingEl) return
  if (charIndex < words[wordIndex].length) {
    typingEl.textContent += words[wordIndex].charAt(charIndex)
    charIndex++
    setTimeout(type, 110)
  } else {
    setTimeout(erase, 1600)
  }
}

function erase() {
  if (charIndex > 0) {
    typingEl.textContent = words[wordIndex].substring(0, charIndex - 1)
    charIndex--
    setTimeout(erase, 55)
  } else {
    wordIndex = (wordIndex + 1) % words.length
    setTimeout(type, 220)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  type()
})
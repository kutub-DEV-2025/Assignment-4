

## Answers to Questions

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
## Answer: ** getElementById মানে একটি ID দিয়ে একটি নির্দিষ্ট element নেয়,
** getElementsByClassName মানে একটি class দিয়ে একটি নির্দিষ্ট element নেয়, 
** querySelector এটি দিয়ে Css selector ব্যবহার করে,
** querySelectorAll CSS selector দিয়ে সব একই ধরনের element নেয়,

### 2. How do you create and insert a new element into the DOM?

Answer: new element make createElement() , ও appendChild() বা append() দিয়ে DOM-এ insert করা হয় ,

### 3. What is Event Bubbling? And how does it work?

Answer: Event Bubbling এর মাধ্যমে event ভিতরের element থেকে ধাপে ধাপে উপরের parent element গুলোতে ছড়িয়ে যায়।

### 4. What is Event Delegation in JavaScript? Why is it useful?

Answer: parent element-এ event listener বসিয়ে child element-এর event handle করা। এটি Event Bubbling ব্যবহার করে এবং performance ও dynamic element handle করার জন্য useful।

### 5. What is the difference between preventDefault() and stopPropagation() methods?

‍Answer: preventDefault()  browser-এর default কাজ বন্ধ করে

stopPropagation()  event parent-এ যাওয়া বন্ধ করে

---

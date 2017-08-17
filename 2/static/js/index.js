document.querySelector('img').addEventListener('mousemove',function(){
    this.style.opacity = 0.8;
});
document.querySelector('img').onmouseout = function(){
    this.style.opacity = 1;
}
<template>
    <div>
        <main class="main">
            <ul class="main__ul">
                <li class="main__list">
                    <img src="https://printler.com/media/photo/146602.jpg" alt="">
                    <div>
                        <span>Darth Vader</span>
                    </div>
                </li>
                <li class="main__list">
                    <img src="https://printler.com/media/photo/146602.jpg" alt="">
                    <div>
                        <span>Darth Vader</span>
                    </div>
                </li>
                <li class="main__list">
                    <img src="https://printler.com/media/photo/146602.jpg" alt="">
                    <div>
                        <span>Darth Vader</span>
                    </div>
                </li>
                <li class="main__list">
                    <img src="https://printler.com/media/photo/146602.jpg" alt="">
                    <div>
                        <span>Darth Vader</span>
                    </div>
                </li>
                <li class="main__list">
                    <img src="https://printler.com/media/photo/146602.jpg" alt="">
                    <div>
                        <span>Darth Vader</span>
                    </div>
                </li>
                <li class="main__list">
                    <img src="https://printler.com/media/photo/146602.jpg" alt="">
                    <div>
                        <span>Darth Vader</span>
                    </div>
                </li>
            </ul>
        </main>
    </div>
</template>


<script>
export default {
    name: 'Main',

    morelist(){
        var cont = 0;
        var items = document.querySelectorAll(".main__list");
        var itemsNone = document.querySelectorAll(".none");

        if (itemsNone.length > 0) {
            items.forEach(item => item.classList.remove("none"));
        }
        else {
            items.forEach(item => {
            if (cont < 4 || cont == items.length-1) {
            }
            else{
                item.classList.add("none");
            }
            cont++;
            });
        }
    }
}
</script>

<style lang="scss">
    @import '../assets/scss/variables.scss';
    @import '../assets/scss/styles/main.scss';
</style>
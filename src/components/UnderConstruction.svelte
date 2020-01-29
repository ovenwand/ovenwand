<style lang="scss">
    @import "../core/theme/variables";

    .under-construction-container {
        border-radius: .5rem;
        bottom: 0;
        left: 0;
        overflow: hidden;
        position: absolute;
        right: 0;
        top: 0;
        z-index: 1;
    }

    .under-construction {
        align-items: center;
        background-color: rgba($black, .9);
        bottom: -1.2rem;
        display: flex;
        justify-content: center;
        left: -1.2rem;
        position: absolute;
        right: -1.2rem;
        top: -1.2rem;

        h1 {
            color: $white-alt;
        }

    }
</style>

<div class="under-construction-container">
    <div class="under-construction">
        <h1>Under construction</h1>
    </div>
</div>

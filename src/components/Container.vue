<template>
    <div class="container" :class="containerClasses">
        <slot/>
    </div>
</template>

<script>
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Container extends Vue
{
  @Prop(Boolean) fluid;

  get containerClasses() {
    return {
      'container-fluid': this.fluid,
    };
  }
}
</script>

<style lang="scss">
    @import "../scss/variables";
    @import "../scss/mixins";

    .container {
        display: block;
        margin: 0 auto;
        padding-left: $container-padding;
        padding-right: $container-padding;
        width: $container-xs;

        @include screen-sm {
            width: $container-sm;
        }

        @include screen-md {
            width: $container-md;
        }

        @include screen-lg {
            width: $container-lg;
        }

        @include screen-xl {
            width: $container-xl;
        }

        &.container-fluid {
            width: 100%;
        }
    }
</style>

<template>
    <div class="row" :class="rowClasses">
        <slot/>
    </div>
</template>

<script>
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Row extends Vue
{
  @Prop(Boolean) fill;
  @Prop(Boolean) padding;

  get rowClasses() {
    return {
      'row-padding': this.padding,
      'row-fill': this.fill,
    };
  }
}
</script>

<style lang="scss">
    @import "../scss/variables";

    .row {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        &.row-padding {
            padding-left: $container-padding;
            padding-right: $container-padding;
        }

        &.row-fill {
            min-height: 100%;
        }
    }

    .container .row {
        margin-left: -$container-padding;
        margin-right: -$container-padding;
    }
</style>

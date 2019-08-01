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
  @Prop(Boolean) paddingXs;
  @Prop(Boolean) paddingSm;
  @Prop(Boolean) paddingMd;
  @Prop(Boolean) paddingLg;
  @Prop(Boolean) paddingXl;

  get rowClasses() {
    return {
      'row-padding': this.padding,
      'row-padding-xs': this.paddingXs,
      'row-padding-sm': this.paddingSm,
      'row-padding-md': this.paddingMd,
      'row-padding-lg': this.paddingLg,
      'row-padding-xl': this.paddingXl,
      'row-fill': this.fill,
    };
  }
}
</script>

<style lang="scss">
    @import "../scss/mixins";
    @import "../scss/variables";

    .row {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;


        &.row-padding {
            padding-left: $container-padding;
            padding-right: $container-padding;
        }

        @include screen-xs {
            &.row-padding-xs {
                padding-left: $container-padding;
                padding-right: $container-padding;
            }
        }

        @include screen-sm {
            &.row-padding-sm {
                padding-left: $container-padding;
                padding-right: $container-padding;
            }
        }

        @include screen-md {
            &.row-padding-md {
                padding-left: $container-padding;
                padding-right: $container-padding;
            }
        }

        @include screen-lg {
            &.row-padding-lg {
                padding-left: $container-padding;
                padding-right: $container-padding;
            }
        }

        @include screen-xl {
            &.row-padding-xl {
                padding-left: $container-padding;
                padding-right: $container-padding;
            }
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

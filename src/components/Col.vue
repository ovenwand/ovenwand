<template>
    <div class="col" :class="colClasses" :style="colStyles">
        <slot/>
    </div>
</template>

<script>
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Col extends Vue
{
  static COLS = 12;

  @Prop([Number, String]) xs;
  @Prop([Number, String]) sm;
  @Prop([Number, String]) md;
  @Prop([Number, String]) lg;
  @Prop([Number, String]) xl;

  @Prop(Boolean) padding;
  @Prop(Boolean) paddingXs;
  @Prop(Boolean) paddingSm;
  @Prop(Boolean) paddingMd;
  @Prop(Boolean) paddingLg;
  @Prop(Boolean) paddingXl;

  cols = Col.COLS;

  get colClasses() {
    return {
      'col-padding': this.padding,
      'col-padding-xs': this.paddingXs,
      'col-padding-sm': this.paddingSm,
      'col-padding-md': this.paddingMd,
      'col-padding-lg': this.paddingLg,
      'col-padding-xl': this.paddingXl,
    };
  }

  get colStyles() {
    return {
      '--col-xs': this.xs && this.getPoint(this.xs),
      '--col-sm': this.sm && this.getPoint(this.sm),
      '--col-md': this.md && this.getPoint(this.md),
      '--col-lg': this.lg && this.getPoint(this.lg),
      '--col-xl': this.xl && this.getPoint(this.xl),
    };
  }

  beforeCreate() {
    this.cols = Col.COLS;
  }

  getPoint(cols) {
    return `${(Number(cols) / this.cols) * 100}%`;
  }
}
</script>

<style lang="scss">
    @import "../scss/variables";
    @import "../scss/mixins";

    .col {
        --col-xs: 100%;
        --col-sm: var(--col-xs);
        --col-md: var(--col-sm);
        --col-lg: var(--col-md);
        --col-xl: var(--col-lg);

        display: flex;
        flex-direction: column;
        flex: 0 0 var(--col-xs);
        max-width: var(--col-xs);
        position: relative;
        z-index: 0;

        @include screen-sm {
            flex: 0 0 var(--col-sm);
            max-width: var(--col-sm);
        }

        @include screen-md {
            flex: 0 0 var(--col-md);
            max-width: var(--col-md);
        }

        @include screen-lg {
            flex: 0 0 var(--col-lg);
            max-width: var(--col-lg);
        }

        @include screen-xl {
            flex: 0 0 var(--col-xl);
            max-width: var(--col-xl);
        }

        &.col-padding {
            padding-left: $container-padding;
            padding-right: $container-padding;
        }

        @include screen-xs {
            &.col-padding-xs {
                padding-left: $container-padding;
                padding-right: $container-padding;
            }
        }

        @include screen-sm {
            &.col-padding-sm {
                padding-left: $container-padding;
                padding-right: $container-padding;
            }
        }

        @include screen-md {
            &.col-padding-md {
                padding-left: $container-padding;
                padding-right: $container-padding;
            }
        }

        @include screen-lg {
            &.col-padding-lg {
                padding-left: $container-padding;
                padding-right: $container-padding;
            }
        }

        @include screen-xl {
            &.col-padding-xl {
                padding-left: $container-padding;
                padding-right: $container-padding;
            }
        }
    }
</style>

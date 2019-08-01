<template>
    <router-link :to="link" class="teaser">
        <div class="teaser-background" :style="teaserBackground"></div>
        <div class="teaser-color" :style="teaserColor"></div>
        <div class="teaser-logo">
            <img :src="logo"/>
        </div>
    </router-link>
</template>

<script>
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Teaser extends Vue
{
  @Prop({ type: String, required: true }) link;
  @Prop({ type: String, required: true }) color;
  @Prop({ type: String, required: true }) logo;
  @Prop({ type: String }) image;

  get teaserBackground()
  {
    return {
      backgroundImage: `url(${this.image})`,
    };
  }

  get teaserColor()
  {
    return {
      backgroundColor: this.color,
    };
  }
}
</script>

<style lang="scss">
    @import "../scss/mixins";
    @import "../scss/variables";

    .teaser {
        align-items: center;
        display: flex;
        justify-content: center;
        height: 100%;
        width: 100%;

        .teaser-background,
        .teaser-color,
        .teaser-logo {
            bottom: 0;
            left: 0;
            position: absolute;
            right: 0;
            top: 0;
        }

        .teaser-background {
            bottom: -6px;
            filter: blur(6px);
            left: -6px;
            opacity: .8;
            right: -6px;
            top: -6px;
            transform-origin: center;
            transition: 1s ease-in-out;

            @include screen-xs {
                background-size: cover;
            }
        }

        .teaser-color {
            opacity: .8;
        }

        .teaser-logo {
            align-items: center;
            display: flex;
            justify-content: center;

            @include screen-xs {
                img {
                    height: auto;
                    max-height: 33%;
                    width: auto;
                    max-width: 50%;
                }
            }
        }

        &:hover {
            .teaser-background {
                transform: scale(1.2);
            }
        }
    }
</style>

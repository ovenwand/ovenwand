<template>
    <Container id="content">
        <Row class="under-construction">
            Under construction
        </Row>
    </Container>
</template>

<script>
import { Component, Mixins } from 'vue-property-decorator';
import Page from '../mixins/Page';

@Component({
  page: {
    name: 'under-construction',
    title: 'Under construction',
    darkText: true,
    back: true,
  },
})
export default class UnderConstruction extends Mixins(Page)
{
}
</script>

<style lang="scss">
    .page-under-construction {
        .under-construction {
            height: calc(100vh - 139px);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 54px;
        }
    }
</style>

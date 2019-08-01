<template>
    <Container id="content">
        <Row>
            <Col>
                MediaLab
            </Col>
        </Row>
    </Container>
</template>

<script>
import { Component, Mixins } from 'vue-property-decorator';
import Page from '../mixins/Page';

@Component({
  page: {
    name: 'project-medialab',
    title: 'Project: MediaLab',
    darkText: true,
    back: true,
  },
})
export default class MediaLab extends Mixins(Page)
{
}
</script>

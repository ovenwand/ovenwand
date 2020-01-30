<script>
    import { Teaser } from '@/components';
	import { Col, Container, Page, Row } from '@/core/components';
	import { action, fluid, BRAND } from '@/store/header';

	action.set(BRAND);
	fluid.set(false);
</script>

<Page title="Portfolio" background="/images/background.png" lightText fluid>
	<Row fill>
		<Col class="o-hidden" sm={6}>
			<Teaser
				title="TalentChannel"
				href="/portfolio/talentchannel"
				color="#29ABE2"
				logo="/images/portfolio/TalentChannel_Logo.png"
				image="/images/portfolio/TalentChannel_Frontstage.png"
			/>
		</Col>
		<Col class="o-hidden" sm={6}>
			<Teaser
				title="MediaLab"
				href="/portfolio/medialab"
				color="#C7B299"
				logo="/images/portfolio/MediaLab_Logo.png"
				image="/images/portfolio/MediaLab_Website.png"
			/>
		</Col>
	</Row>
</Page>

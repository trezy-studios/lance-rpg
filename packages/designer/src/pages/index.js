// Local imports
import { AssetsPanel } from 'components/AssetsPanel'
import { EditorContainer } from 'components/EditorContainer'
import { PanelContainer } from 'components/PanelContainer'





export default function HomePage() {
	return (
		<>
			<PanelContainer panels={[
				AssetsPanel,
				AssetsPanel,
			]} />
			<EditorContainer />
			<PanelContainer panels={[
				AssetsPanel,
				AssetsPanel,
			]} />
		</>
	)
}

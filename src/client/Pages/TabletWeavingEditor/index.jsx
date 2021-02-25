import React, {useState} from 'react'
import SectionWrap from '../../Components/SectionWrap'
import Text, {XXL} from '../../Components/Text'
import {Box} from 'Components/Box'
import {BLUE4, WHITE} from 'src/client/styles/index'
import {useMediaQuery} from 'plugins/MediaQuery'
import ControlPanel from './ControlPanel'
import TabletsPanel from './TabletsPanel'
import DraftPanel from './DraftPanel'
import initDraft from './DraftExamples/draft0.json'

const EditorPanel = () => {
	const {isPhone} = useMediaQuery()
	const [draft, setDraft] = useState(initDraft)
	const [selectedCol, setSelectedCol] = useState(0)
	const [colors, setColors] = useState(draft.colors)

	const {tablets, holes, picks, skews, dirsChanges} = draft

	const handleUploaded = uplDraft => {
		setDraft(uplDraft)
		setColors(uplDraft.colors)
	}

	const handleSkewToggle = col => {
		const newSkews = skews.slice()
		newSkews[col] = -skews[col]
		if (skews !== newSkews) setDraft({...draft, skews: newSkews})
	}

	const handleDirChange = ({col, row, isTurnPoint}) => {
		const newDirsChanges = dirsChanges.slice()
		newDirsChanges[col][row] = isTurnPoint ? 0 : 1
		if (dirsChanges !== newDirsChanges)
			setDraft({...draft, dirsChanges: newDirsChanges})
	}

	const handleColorChange = ({col, row}) => {
		if (colors[selectedCol]) {
			const newTablets = tablets.slice()
			newTablets[col][row] = colors[selectedCol]
			if (tablets !== newTablets) setDraft({...draft, tablets: newTablets})
		}
	}

	const handleHolesChange = newHoles => {
		if (newHoles !== holes) {
			const newTablets =
				newHoles > holes
					? tablets.map(t => [...t, t.slice(-1)[0]])
					: tablets.map(t => t.slice(0, -1))

			setDraft({...draft, holes: newHoles, tablets: newTablets})
		}
	}
	const handlePicksChange = newPicks => {
		if (newPicks !== picks) {
			const newDC =
				newPicks > picks
					? dirsChanges.map(t => [...t, 0])
					: dirsChanges.map(t => t.slice(0, -1))

			setDraft({...draft, picks: newPicks, dirsChanges: newDC})
		}
	}
	const handleTabletsChange = newTabletsNum => {
		if (newTabletsNum !== tablets?.length) {
			const isMore = newTabletsNum > tablets?.length
			const newDC = isMore
				? [...dirsChanges, [...dirsChanges.slice(-1)[0]]]
				: dirsChanges.slice(0, -1)
			const newSkews = isMore
				? [...skews, ...[...skews.slice(-1)]]
				: skews.slice(0, -1)
			const newTablets = isMore
				? [...tablets, [...tablets.slice(-1)[0]]]
				: tablets.slice(0, -1)

			setDraft({
				...draft,
				tablets: newTablets,
				skews: newSkews,
				dirsChanges: newDC,
			})
		}
	}

	const handlePaletteColorChange = newColor => {
		const newColors = colors.slice()
		newColors[selectedCol] = newColor
		if (colors !== newColors) setColors(newColors)
	}

	const gap = '0.05rem'

	const ControlPanelComp = () => (
		<ControlPanel
			{...{
				draft,
				colors,
				selectedCol,
				onHolesChange: handleHolesChange,
				onPicksChange: handlePicksChange,
				onTabletsChange: handleTabletsChange,
				onPaletteColorChange: handlePaletteColorChange,
				setSelectedCol,
				onUploaded: handleUploaded,
			}}
		/>
	)

	const TabletsPanelComp = () => (
		<TabletsPanel
			{...{
				gap,
				draft,
				onSkewToggle: handleSkewToggle,
				onColorChange: handleColorChange,
			}}
		/>
	)

	return (
		<Box gap top spaceBetween column={isPhone}>
			{isPhone && <ControlPanelComp />}
			<Box left inline column gap {...{shadow: 1, bg: WHITE, padding: '1rem'}}>
				{isPhone && <TabletsPanelComp />}
				<DraftPanel
					{...{
						gap,
						draft,
						onSkewToggle: handleSkewToggle,
						onDirChange: handleDirChange,
					}}
				/>
				{!isPhone && <TabletsPanelComp />}
			</Box>
			{!isPhone && <ControlPanelComp />}
		</Box>
	)
}

const TabletWeavingEditor = () => {
	return (
		<SectionWrap top left gap="2rem" bg={BLUE4}>
			<Text sets={[XXL]} as="h1">
				Tablet Weaving Editor
			</Text>
			<EditorPanel />
		</SectionWrap>
	)
}

export default TabletWeavingEditor

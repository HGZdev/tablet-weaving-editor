import React, {useRef, useState} from 'react'
import {Box} from 'Components/Box'
import {Input} from 'src/client/Components/Inputs'
import styled from 'styled-components'
import {downLoadFile, isJsonString} from 'src/client/helpers'
import {pick} from 'lodash'
import draft1 from './DraftExamples/draft1.json'
import draft2 from './DraftExamples/draft2.json'
import draft3 from './DraftExamples/draft3.json'
import Text, {XS} from 'src/client/Components/Text'
import {
	BlueButton,
	GreenButton,
	TransButton,
} from 'src/client/Components/Buttons/TabletButtons'

const fieldsToSave = [
	'fileName',
	'tablets',
	'holes',
	'picks',
	'skews',
	'dirsChanges',
	'colors',
]

const HiddenUploadInput = styled.input`
	display: none;
`

export const FilePanel = ({onUploaded, draft, colors}) => {
	const inputFile = useRef(null)
	const [fileName, setFileName] = useState(draft?.fileName)

	const handleUpload = e => {
		const fileReader = new FileReader()
		const rawFile = e.target.files[0]
		fileReader.readAsText(rawFile, 'UTF-8')
		fileReader.addEventListener('load', e => {
			const res = e.target.result
			const upload = isJsonString(res) && JSON.parse(res)
			upload.fileName = rawFile?.name.replace('.json', '')
			if (upload && upload !== draft) onUploaded(upload)
		})
	}

	const handleDownload = () => {
		const draftToSave = pick({...draft, fileName, colors}, fieldsToSave)
		const draftStr = JSON.stringify(draftToSave)
		downLoadFile([draftStr], 'application/json', `${fileName || 'draft'}.json`)
	}

	const handleUploadClick = e => {
		e.stopPropagation()
		e.preventDefault()
		inputFile.current?.click()
	}

	const handleNamChange = e => setFileName(e.target.value)

	const handleExampleDraftUpload = draft => onUploaded(draft)

	return (
		<Box left bottom column gap>
			<Box bottom left gap="0.5rem" wrap>
				<Box left inline>
					<HiddenUploadInput
						{...{
							type: 'file',
							accept: '.json',
							id: `file-input-${Date.now()}`, // prevents duplications
							ref: inputFile,
							onChange: handleUpload,
						}}
					/>
					<Input
						{...{
							type: 'text',
							label: 'File name',
							value: fileName,
							onChange: handleNamChange,
						}}
					/>
				</Box>
				<Box left inline gap="0.5rem">
					<BlueButton
						{...{
							label: 'Open',
							onClick: handleUploadClick,
						}}
					/>
					<GreenButton
						{...{
							label: 'Download',
							onClick: handleDownload,
						}}
					/>
				</Box>
			</Box>
			<Box left inline gap="0.5rem">
				<Text sets={[XS]}> Examples:</Text>

				<TransButton
					{...{
						label: 'Pattern 1',
						onClick: () => handleExampleDraftUpload(draft1),
					}}
				>
					draft 1
				</TransButton>
				<TransButton
					{...{
						label: 'Pattern 2',
						onClick: () => handleExampleDraftUpload(draft2),
					}}
				>
					draft 2
				</TransButton>
				<TransButton
					{...{
						label: 'Pattern 3',
						onClick: () => handleExampleDraftUpload(draft3),
					}}
				>
					draft 3
				</TransButton>
			</Box>
		</Box>
	)
}

export default FilePanel

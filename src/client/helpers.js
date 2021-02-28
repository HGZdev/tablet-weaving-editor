import {format, isValid} from 'date-fns'

export const mockFunc = n => n * n

export const dateFormatter = (d, f = 'yyyy-MM-dd') => {
	if (!d) return
	const date = new Date(d)
	if (!isValid(date)) throw new Error(`Date is invalid.`)

	return format(date, f)
}

export const isNumeric = v => Number.parseInt(v, 10) && !Number.isNaN(v)

export const isJsonString = str => {
	try {
		JSON.parse(str)
	} catch {
		return false
	}
	return true
}

/**
 * Method is use to download file.
 * @param data - Array Buffer data
 * @param type - type of the document.
 * @param name - name of the document.
 */
export const downLoadFile = (
	data,
	type = 'application/json',
	name = 'newFile'
) => {
	const blob = new Blob([data], {type: type.toString()})
	const url = window.URL.createObjectURL(blob)
	const a = document.createElement('a')
	a.download = name
	a.href = url
	document.body.append(a)
	a.click()
	a.remove()
	// window.open(url)
}

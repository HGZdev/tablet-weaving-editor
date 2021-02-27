import React from 'react'
import cross from 'assets/icons/cross.svg'
import email from 'assets/icons/email.svg'
import phone from 'assets/icons/phone.svg'
import linkedin from 'assets/icons/linkedin.svg'
import github from 'assets/icons/github.svg'
import {SvgImage, SvgBgImage} from './helpers'
export {SvgBgImage, SvgImage}

export const CrossIcon = props => (
	<SvgImage {...{src: cross, innerProps: {alt: 'cross-icon'}, ...props}} />
)
export const TelIcon = props => (
	<SvgImage {...{src: phone, innerProps: {alt: 'phone-icon'}, ...props}} />
)
export const EmailIcon = props => (
	<SvgImage {...{src: email, innerProps: {alt: 'email-icon'}, ...props}} />
)
export const GithubIcon = props => (
	<SvgImage {...{src: github, innerProps: {alt: 'github-icon'}, ...props}} />
)
export const LinkedinIcon = props => (
	<SvgImage
		{...{src: linkedin, innerProps: {alt: 'linkedin-icon'}, ...props}}
	/>
)

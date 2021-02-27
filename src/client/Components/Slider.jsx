/* eslint-disable no-return-assign */
import React, {Fragment, Component} from 'react'
import {Box} from 'Components/Box'
import Text, {XXL} from 'Components/Text'
import {styled, css, accent} from 'Styles'
import Slider from 'react-slick'

//
// ─── ARROWS ─────────────────────────────────────────────────────────────────────
//

const ArrowField = styled(Box)`
	position: absolute;
	top: 50%;
	transform: translate(0, -50%);
	${p =>
		p.flip
			? css`
					left: 0%;
			  `
			: css`
					right: 0%;
			  `};

	width: 40%;
	height: calc(100% - 4rem);

	cursor: pointer;
	z-index: 1000;

	div {
		opacity: 0;
		transition: 0.5s;
	}

	&:hover {
		div {
			opacity: 1;
			color: ${accent};
		}
	}
`

class Arrow extends Component {
	render() {
		const {flip, onClick} = this.props
		return (
			<ArrowField
				flip={flip}
				left={flip}
				right={!flip}
				padding="0 2rem"
				onClick={onClick}
			>
				<Text sets={[XXL]} inline>
					{flip ? '<' : '>'}
				</Text>
			</ArrowField>
		)
	}
}

// Slide content

const SlideImg = styled.img`
	/* ramka dla pojedynczego slajdu */
	margin: 0rem 0.5rem 0rem;
	/* WAŻNE: opcja: 1: rozciągnąć img na cały slajd (100%) i pozwolić na dowolną wysokość (nie okreslać height)  */
	/* width: 80%; */
	/* WAŻNE opcja 2: ustawić na sztywno wysokość slajdu (px, rem) i pozwolić na dowolną szerokość (nie okreslać) */
	height: 30rem;
`

// eslint-disable-next-line no-unused-vars
const SlideDescription = styled(Box)`
	padding: 0rem 1rem;
`

// Slide

const Slide = ({images}) => (
	<Box column top>
		<SlideImg src={images.url} />
		{/* <SlideDescription images={images}>{images.description}</SlideDescription> */}
	</Box>
)

// SliderPanel

const SlideWrapper = styled(Box)`
	/* .slick-slide => tam wygodniej zapisać cechy tego komponentu */
	/* BARDZO WAŻNE: każdy pojetynczy slajd musi mieć TEN dodatkowy wrap, aby slider zadziałał */
	/* Nie jest ważny jego typ - może być Flexbox */
`

const SliderWrapper = styled(Box)`
	/* BARDZO WAŻNE - określenie szerokości okna z WIDOCZNYMI aktualnie slajdami */
	width: 100%;
	/* Można okreslić również konkretną wartość. Ważne aby COKOLWIEK było określone na tym poziomie */
	/* max-width: 500px; */
	/* Nie jest ważny jego typ - może być Flexbox */
`

const StyledSlider = styled(Slider)`
	/* potrzebne do ustawiania kropek i strzałek */
	position: relative;
	/* BARDZO WAŻNE do odcięcia aktualnie nie wyświetlanych slajdów */
	overflow: hidden;
	/* WAŻNE do powiekszania pola, gdzie mogą byc wyświetlane kropki (pomimo opcji hidden) */
	padding: 2rem 0;

	/* nie zadziała na tym poziomie prawidłowo! */
	/* width: 100%;  */
	/* może być alternatywą dla określenia granic okna z poziomu SliderWrapper */
	/* max-width: 300px;  */

	.slick-list,
	.slick-track {
		/* tu nic nie trzeba dawać... */
	}

	.slick-slide {
		/* BARDZO WAŻNE do utrzymania slidera w linii! Ile się tego naszukałam... */
		display: inline-block;

		/* nie zadziała na tym poziomie! */
		width: 5rem;
		/* nie zadziała na tym poziomie! */
		height: 10rem;
		/* background: blue; */

		div {
			/* <Slide></Slide> */
			/* na tym poziomie właściwy kontent pojedynczego slajdu!!! */
			/* Nie jest ważny jego typ - może być Flexbox */
			/* rozciagnięcie do wrappera pewnie będzie dobre, zwłaszcza przy zdjęciach */
			height: 100%;
			/* background: lightblue; */
		}
	}

	.slick-dots {
		/* UWAGA: kropki nie pojawią się poza terenem wyświetlanego slidera jeżeli jest ustawione overflow: hidden. */
		/* ROZWIĄZANIE: kropki muszę być w obszarze okna wyświetlanego slidera, a same slidy muszą być po prostu krótsze... */
		position: absolute;
		margin: 0 auto;
		bottom: 0%;
		width: 100%;
		text-align: center;

		li {
			/* kropki w jednej linii */
			display: inline-block;
			margin: 0 6px;
		}
		button {
			display: block;
			padding: 0;
			width: 10px;
			height: 10px;
			color: transparent;
			background: transparent;
			box-sizing: content-box;
			border: 1px solid ${accent};
			border-radius: 50%;
			overflow: hidden;
			outline: none;
			cursor: pointer;
		}
		.slick-active {
			button {
				/* kolor aktywnej kropki */
				background-color: ${accent};
			}
		}
	}
`

class SliderPanel extends Component {
	render() {
		const {project} = this.props
		const settings = {
			infinite: true,
			speed: 1000,
			// cssEase: 'linear',
			fade: true,
			// autoplay: true,

			// centerMode: true,
			// variableWidth: true,

			// slidesToShow: 1,
			// slidesToScroll: 1,

			swipe: true,
			touchMove: true,
			dots: true,

			arrows: false,
			// tu można wstawić całe komponenty, które będą strzałkami slidera, onClick={this.props.onClick}
			// prevArrow: <Arrow direction="left" />,
			// nextArrow: <Arrow direction="right" />,
		}
		return (
			<SliderWrapper relative>
				<StyledSlider {...settings} ref={slider => (this.slider = slider)}>
					{project.images.map((item, i) => (
						<SlideWrapper key={i}>
							<Slide key={i} images={item} />
						</SlideWrapper>
					))}
				</StyledSlider>
				<Fragment>
					<Arrow onClick={() => this.slider.slickPrev()} flip />
					<Arrow onClick={() => this.slider.slickNext()} />
				</Fragment>
			</SliderWrapper>
		)
	}
}

export default SliderPanel

import React, {Component} from 'react'
import Text, {
	BOLD,
	ITALIC,
	L,
	M,
	MAIN_COL,
	OL,
	S,
	UL,
	XXL,
} from 'Components/Text'
import Link from 'Components/Link'
import SectionWrap from 'Components/SectionWrap'
import {Box} from 'Components/Box'
import {MetaData, makeItemMetaData} from '../Components/MetaData'

const text = (
	<>
		<Text sets={[XXL]} as="h1">
			<Text sets={[XXL]} uppercase>
				Test:
			</Text>{' '}
			Text formats
		</Text>

		<Text sets={[L, BOLD]} as="h2">
			Quod eo liquidius faciet, si perspexerit rerum inter eas verborumne sit
			controversia?
		</Text>

		<Text sets={[M, MAIN_COL]} as="p">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Habes, inquam,
			Cato, formam eorum, de quibus loquor, philosophorum. Nam, ut saepe iam
			dixi, in infirma aetate inbecillaque mente vis naturae quasi per caliginem
			cernitur; Duo Reges: constructio interrete. Nullus est igitur cuiusquam
			dies natalis. Sed plane dicit quod intellegit. Itaque eos id agere, ut a
			se dolores, morbos, debilitates repellant. Tubulo putas dicere? Philosophi
			autem in suis lectulis plerumque moriuntur. Quid, si etiam iucunda memoria
			est praeteritorum malorum?
		</Text>

		<Text sets={[M, MAIN_COL]} as="p">
			<Link href="http://loripsum.net/" target="_blank">
				Tu quidem reddes;
			</Link>{' '}
			Hoc dictum in una re latissime patet, ut in omnibus factis re, non teste
			moveamur.{' '}
			<Link href="http://loripsum.net/" target="_blank">
				Aufert enim sensus actionemque tollit omnem.
			</Link>{' '}
			Est autem officium, quod ita factum est, ut eius facti probabilis ratio
			reddi possit. Nam et complectitur verbis, quod vult, et dicit plane, quod
			intellegam;{' '}
			<Text sets={[M, BOLD, MAIN_COL]}>
				Summum a vobis bonum voluptas dicitur.
			</Text>{' '}
			Quamvis enim depravatae non sint, pravae tamen esse possunt.{' '}
		</Text>

		<Text sets={[L, BOLD]} as="h2">
			Quod eo liquidius faciet, si perspexerit rerum inter eas verborumne sit
			controversia?
		</Text>

		<Text sets={[M, MAIN_COL]} as="p">
			Sed ille, ut dixi, vitiose. Potius inflammat, ut coercendi magis quam
			dedocendi esse videantur. Ego vero volo in virtute vim esse quam maximam;
			Nam illud vehementer repugnat, eundem beatum esse et multis malis
			oppressum. Quod eo liquidius faciet, si perspexerit rerum inter eas
			verborumne sit controversia.{' '}
			<Text sets={[M, ITALIC, MAIN_COL]}>
				Graece donan, Latine voluptatem vocant.
			</Text>{' '}
			<Text sets={[M, BOLD, MAIN_COL]}>
				Illa tamen simplicia, vestra versuta.
			</Text>{' '}
			Idemque diviserunt naturam hominis in animum et corpus. Utrum igitur tibi
			litteram videor an totas paginas commovere?{' '}
			<Text sets={[M, BOLD, MAIN_COL]}>Nihil enim hoc differt.</Text>{' '}
		</Text>

		<Text sets={[M, ITALIC]}>
			Qui mos cum a posterioribus non essets r[etentus], Arcesilas eum revocavit
			instituitque ut ii, qui se audire vellent, non de se quaererent, sed ipsi
			dicerent, quid sentirent; Sed tamen intellego quid velit.
		</Text>

		<Text sets={[S, UL]} as="ul">
			<Text sets={[M, MAIN_COL]} as="li">
				Quamquam non negatis nos intellegere quid sit voluptas, sed quid ille
				dicat.
			</Text>
			<Text sets={[M, MAIN_COL]} as="li">
				Nam quibus rebus efficiuntur voluptates, eae non sunt in potestate
				sapientis.
			</Text>
			<Text sets={[M, MAIN_COL]} as="li">
				Ex quo, id quod omnes expetunt, beate vivendi ratio inveniri et
				comparari potest.
			</Text>
			<Text sets={[M, MAIN_COL]} as="li">
				Respondebo me non quaerere, inquam, hoc tempore quid virtus efficere
				possit.
			</Text>
		</Text>

		<Text sets={[S, OL]} as="ol">
			<Text sets={[M]} as="li">
				Sed haec ab Antiocho, familiari nostro, dicuntur multo melius et
				fortius, quam a Stasea dicebantur.
			</Text>
			<Text sets={[M]} as="li">
				Ait enim se, si uratur, Quam hoc suave! dicturum.
			</Text>
			<Text sets={[M]} as="li">
				Iam in altera philosophiae parte.
			</Text>
		</Text>

		<Text sets={[M, MAIN_COL]} as="p">
			<Link href="http://loripsum.net/" target="_blank">
				Compensabatur, inquit, cum summis doloribus laetitia.
			</Link>{' '}
			Quid enim possumus hoc agere divinius? Idemque diviserunt naturam hominis
			in animum et corpus. Vitae autem degendae ratio maxime quidem illis
			placuit quieta. Summum ením bonum exposuit vacuitatem doloris; Nonne
			igitur tibi videntur, inquit, mala?{' '}
		</Text>
	</>
)

const metaData = makeItemMetaData({title: 'TextPage'})

class TextPage extends Component {
	render() {
		return (
			<SectionWrap gap left>
				<MetaData {...{metaData}} />
				<Box column left gap>
					{text}
				</Box>
			</SectionWrap>
		)
	}
}

export default TextPage

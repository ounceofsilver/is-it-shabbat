import { styles } from 'is-it-shabbat-core';
import React from 'react';
import { ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';

import { CenteredContainer, MainCenterText, MainText, SecondaryCenterText } from '../../Styles';
import { IOmerData } from './types';
import getOmer, { weeksAndDays } from './utilities/getOmer';

/* tslint:disable:max-line-length */
export const PureOmer = ({
	omerHoliday,
	withBlessing,
}: {
	omerHoliday: IOmerData,
	withBlessing: boolean,
}) => (
		omerHoliday && <ScrollView>
			<CenteredContainer>
				{
					withBlessing && (
						<>
							<SecondaryCenterText>{'BA-RUCH A-TAH ADO-NAI E-LO-HE-NU ME-LECH HA-OLAM ASHER KID-E-SHA-NU BE-MITZ-VO-TAV VETZI-VA-NU AL SEFI-RAT HA-OMER.'}</SecondaryCenterText>
							<MainCenterText>{'Blessed are You, Lord our God, King of the Universe, who has sanctified us with His commandments, and commanded us concerning the counting of the Omer.'}</MainCenterText>
						</>
					)
				}
				<SecondaryCenterText>{`Today is ${weeksAndDays(omerHoliday.dayOf, omerHoliday.dayOfWeekOf, omerHoliday.weekOf)}, of the Omer.`}</SecondaryCenterText>
				<MainText>{'May the Merciful One restore unto us the service of the Bet Hamikdash to its place, speedily in our days; Amen, Selah.'}</MainText>
				<MainText>{'For the Choirmaster; a song with instrumental music; a Psalm. May God be gracious to us and bless us; may He make His countenance shine upon us forever; that Your way be known on earth, Your salvation among all nations. The nations will extol You, O God; all the nations will extol You. The nations will rejoice and sing for joy, for You will judge the peoples justly and guide the nations on earth forever. The peoples will extol You, O God; all the peoples will extol You, for the earth will have yielded its produce and God, our God, will bless us. God will bless us; and all, from the farthest corners of the earth, shall fear Him.'}</MainText>
				<MainText>{'We implore You, by the great power of Your right hand, release the captive. Accept the prayer of Your people; strengthen us, purify us, Awesome One. Mighty One, we beseech You, guard as the apple of the eye those who seek Your Oneness. Bless them, cleanse them; bestow upon them forever Your merciful righteousness. Powerful, Holy One, in Your abounding goodness, guide Your congregation. Only and Exalted One, turn to Your people who are mindful of Your holiness. Accept our supplication and hear our cry, You who knows secret thoughts. Blessed be the name of the glory of His kingdom forever and ever.'}</MainText>
				<MainText>{`Master of the universe, You have commanded us through Moses Your servant to count Sefirat Ha-Omer, in order to purify us from our evil and uncleanness. As You have written in Your Torah, "You shall count for yourselves from the day following the day of rest, from the day on which you bring the Omer as a wave-offering; [the counting] shall be for seven full weeks. Until the day following the seventh week shall you count fifty days," so that the souls of Your people Israel may be cleansed from their defilement. Therefore, may it be Your will, Lord our God and God of our fathers, that in the merit of the Sefirat Ha-Omer which I counted today, the blemish that I have caused in the sefirah`}
					<Text style={{ color: styles.colors.textMain }}>{` ${omerHoliday.dayBlessing} Shebe${omerHoliday.weekBlessing} (${omerHoliday.dayBlessingExplanation} and ${omerHoliday.weekBlessingExplanation}) `}</Text>
					{`be rectified and I may be purified and sanctified with supernal holiness. May abundant bounty thereby be bestowed upon all the worlds. May it rectify our nefesh, ruach and neshamah from every baseness and defect, and may it purify and sanctify us with Your supernal holiness. Amen, selah.`}
				</MainText>
				<MainText>{'From Siddur Tehillat Hashem. © Copyright Kehot Publication Society, Brooklyn NY'}</MainText>
			</CenteredContainer>
		</ScrollView>
);

export default connect(
	({ now, holidays }) => ({
		omerHoliday: getOmer(holidays, now),
	}),
)(PureOmer);

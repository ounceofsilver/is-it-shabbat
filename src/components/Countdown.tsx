import { DateTime, Duration } from 'luxon';
import { useTime } from '../time';

const getDifference = (now: DateTime, end: DateTime) => end.diff(now);

export default function countdown({
	end,
	children,
	refreshInterval = 100,
}: {
	end: DateTime,
	children: (d: Duration) => any,
	refreshInterval?: number,
}) {
	const now = useTime(refreshInterval);

	return children(getDifference(now, end));
}

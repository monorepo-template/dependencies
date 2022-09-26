export default function mapMapToRecord<A extends number | string | symbol, B>(map: Readonly<Map<A, B>>): Record<A, B>;

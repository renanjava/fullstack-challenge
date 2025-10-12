export function hoursToHHMM(hours: any) {
  const totalMinutes = hours * 60
  const h = Math.floor(totalMinutes / 60)
  const m = Math.floor(totalMinutes % 60)
  const s = Math.round((totalMinutes % 1) * 60)
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

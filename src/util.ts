interface Option<L extends string> {
  label: L
  value: string
}

export const makeOption = <L extends string>(
  label: L
): Option<L> => ({
  label,
  value: label,
})

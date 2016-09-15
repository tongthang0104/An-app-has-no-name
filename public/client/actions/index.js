export function selectProfile(profile) {
  console.log(profile)
  return {
    type: 'PERSON_SELECTED',
    payload: profile
  }
}

export const formatAccountDescription = metadata => {
  return `${metadata.institution.name} - ${metadata.account.name} - ${metadata.account.mask}`;
}
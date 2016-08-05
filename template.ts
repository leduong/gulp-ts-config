export class <%= moduleName %> {
<% _.forEach(constants, function (constant) { %>
  public static get <%= constant.name %>(): string {
    return <%= constant.value %>;
  }<% }); %>
}
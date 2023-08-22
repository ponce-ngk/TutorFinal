/// <reference types="cypress" />

let course: any = null;

describe("Loading the JSON fixture", function () {
  before(function () {
    //passing through the tutors json to be ingested and iterate over each objetc and assign out to c
    cy.fixture("tutors.json").then((c: any) => {
      course = c;
    });
  });

  beforeEach('Check: Define the dimensions of the screen being used', function () {
    //This defines the dimensions of the screen
    cy.viewport(1440, 1440);
    //this is a dyamic way of passing through the url which is defined in the
    //cypress.config.ts file.
    cy.visit(course.route);
  });

  /**
   * This test case is checking that the headers and summary are present on all the
   * cards. You would expect all to match as it is coming from the JSON fixture
   */
  it('Course Reference page', function () {
    // Test case
    cy.visit(course.route);
    cy.wait(3000)
    cy.get('.app-bar', {timeout: 10000}).contains(course.title.trim());
    cy.get('.z-10').contains(course.title.trim());
    course.los.forEach((topic: any) => {
      if (!topic.hide) {
        cy.get('.card').contains(topic.title.trim())
        cy.get('.card-footer').contains(topic.summary.trim())
      }
    });
    cy.get('[class="btn btn-sm"]').should("exist");
    cy.contains('[data-testid="drawer"]').should("not.exist");
  });

  it('Test for Info Bar in top left', function () {
    let contents = [course.title.trim(), course.summary.trim()]
    cy.toggleInfoWithVerification(contents)
  });

  it('Test for the TOC in top right', function () {
    cy.toggleTOCWithVerification(course.los)
  });

  it("Topics", function () {
    course.los.forEach((topic: any) => {
      if (!topic.hide) {
        console.log(topic);
        cy.clickCard(topic);
        cy.wait(500);
        cy.go("back");
        cy.wait(500);
      }
    });
  });

  it("Deep Topics", function () {
    course.los.forEach((topic: any) => {
      if (!topic.hide) {
        cy.wait(500);
        cy.clickCard(topic);
        topic.los.forEach((lo: any) => {
          cy.clickCard(lo);
          lo.los.forEach((l: any, i: number) => {
            cy.clickCard(l);
          });
          cy.get('div.h-full.overflow-hidden.contents').invoke('css', 'overflow', 'visible');
          cy.get('li.crumb').eq(1).click();
        });
        cy.get('div.h-full.overflow-hidden.contents').invoke('css', 'overflow', 'visible');
        cy.get('li.crumb').eq(0).click();
      }
    });

  });

  it('Verify the folder downloaded', () => {
    cy.verifyDownload('archive.zip', { timeout: 2500 });
  });
});
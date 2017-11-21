import { Component, OnInit } from "@angular/core";
import { ResponseService } from "../../services/response.service";
import jsPDF from "jspdf";
import "jspdf-autotable";
@Component({
    selector: "app-report",
    templateUrl: "./report.component.html",

    styleUrls: ["./report.component.css"],
    providers: [ResponseService]
})
export class ReportComponent implements OnInit {
    private report = {
        id: "",
        date: ""
    };
    private dates = [];
    private reportData = {};
    private displayData = [];
    showDate = false;
    showList = false;
    constructor(private _responseService: ResponseService) { }

    ngOnInit() { }

    clearDates() {
        this.dates = [];
        this.showDate = false;
        this.showList = false;
        this.report.date = "";
    }
    onExport() {
        const responseCollection = {};
        this._responseService.getResponsesById(this.report.id).subscribe(
            res => {
                // console.log(res);
                for (const item in res) {
                    if (item.match(/^response.+/i)) {
                        responseCollection[item] = res[item];
                    }
                }
                if (Object.keys(responseCollection).length <= 0) {
                    console.log("There is no responses.");
                } else {
                    this.reportData = {};
                    this.dates = [];
                    for (const item in responseCollection) {
                        const date = item.substring(9);
                        this.dates.push(date);
                        this.reportData[date] = responseCollection[item];
                    }
                    this.showDate = true;
                    // console.log(this.dates);
                    // console.log(this.reportData);
                }
            },
            err => {
                console.log(err);
            }
        );
        if (this.report.date !== "") {
            this._responseService
                .getListQuestionsById(this.reportData[this.report.date]["idPath"])
                .subscribe(
                res => {
                    // console.log(res);
                    const data = this.reportData[this.report.date];
                    // console.log(data);
                    const labels = res["questioncatalog"];
                    const newData = {};
                    // console.log(labels);
                    const qna = {};
                    const rawData = {};

                    for (const item in labels) {
                        if (data[item] !== undefined) {
                            newData[item] = data[item];
                        }
                        for (const val in labels[item]["questions"]) {
                            qna[labels[item]["questions"][val]["label"]] =
                                newData[item][val];
                            rawData[labels[item]["questions"][val]["label"]] = val;
                        }
                    }
                    this.displayData = [];
                    for (const key in qna) {
                        this.displayData.push({ key: key, value: qna[key] });
                    }
                    this.showList = true;
                    // console.log(newData);
                    // console.log(qna);
                    // this.exportReport(rawData, qna, this.report.id, this.report.date);

                },
                err => {
                    console.log(err);
                }
                );
        }
    }

    exportReport(rawData, questions_answers, id, date) {
        const warning = {
            'glycemie': {
                'level1': 600,
                'level2': 1000,
                'level3': 2000
            },
            'cholesterol': {
                'level1': 1000,
                'level2': 2000,
                'level3': 3000
            },
            'triglycerides': {
                'level1': 1000,
                'level2': 1500,
                'level3': 2000
            }
        };
        /*
        const cols = ["Questions", "Responses"];
        const rows = [];
        */
        const response = this.reportData[date];

        const doc = new jsPDF();
        let spacing = 40;
        let numericalOrder = 1;
        // size of page, here is A4
        const pageHeight = doc.internal.pageSize.height;
        const pageWidth = doc.internal.pageSize.width;
        doc.setFont("courier");

        // for title
        doc.setFontSize(20);
        doc.setFontStyle("bold");
        doc.setTextColor(255, 0, 0);
        const title = "Rapport du patient numéro " + id + " le " + date;

        // textWidth in millimetre
        const textWidth = doc.getStringUnitWidth(title) * 20 * 0.352778;
        // center align
        doc.text((pageWidth - textWidth) / 2, spacing - 20, title);


        // for content - questions & answers
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        for (const item in questions_answers) {
            /*
            const temp = [item, questions_answers[item]];
            rows.push(temp);
            */
            if (spacing > pageHeight - 30) {
                doc.addPage();
                spacing = 20;
            }
            doc.setFontStyle("bold");
            doc.text(20, spacing, String(numericalOrder++) + '. ' + item);
            doc.setFontStyle("normal");
            doc.text(30, spacing += 10, String(questions_answers[item]));
            // console.log(questions_answers[item]);
            // add warnings
            doc.setTextColor(255, 0, 0);
            doc.setFontStyle("bold");
            if (warning[rawData[item]] !== undefined) {
                console.log(warning[rawData[item]]['level1']);
                let annonce = '';
                if (questions_answers[item] >= warning[rawData[item]]['level1'] && questions_answers[item] < warning[rawData[item]]['level2']) {
                    annonce = '* Higher than normal *';
                } else if (questions_answers[item] >= warning[rawData[item]]['level2'] && questions_answers[item] < warning[rawData[item]]['level3']) {
                    annonce = '** Dangerous **';
                } else if (questions_answers[item] >= warning[rawData[item]]['level3']) {
                    annonce = '*** Emergency ***';
                }
                if (annonce != '') doc.text(30, spacing += 10, annonce);
            }
            doc.setFontStyle("normal");
            doc.setTextColor(0, 0, 0);
            spacing += 15;
        }

        /*
        const header = function (s) {
          doc.setFontSize(18);
          doc.setTextColor(40);
          doc.setFontStyle("bold");
          doc.text(
            "Rapport du patient numéro " + id + " le " + date,
            s.settings.margin.left,
            30
          );
        };
        
        const options = {
          addPageContent: header,
          margin: {
            top: 10
          },
          startY: doc.autoTableEndPosY() + 40
        };
        */

        //doc.autoTable(cols, rows, options);
        // open pdf in a newtab
        const string = doc.output("datauristring");
        const iframe =
            "<iframe width='100%' height='100%' src='" +
            string +
            "'></iframe>";
        const x = window.open();
        x.document.open();
        x.document.write(iframe);
        // x.document.close();
        // doc.save('Report[' + this.report.id + '][' + this.report.date + '].pdf');
    }

}
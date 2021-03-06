import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-cadastrar-editar-artigo',
  templateUrl: './cadastrar-editar-artigo.component.html',
  styleUrls: ['./cadastrar-editar-artigo.component.css']
})
export class CadastrarEditarArtigoComponent implements OnInit {
  pergunta = '';
  resposta = '';
  alertaSucesso = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
  }

  salvarQna() {
    this.alertaSucesso = false;

    const body = {
        'add': {
            'qnaPairs': [
                {
                    'question': this.pergunta,
                    'answer': this.resposta
                }
            ]
        }
    };

    this.http.patch(
      'https://westus.api.cognitive.microsoft.com/qnamaker/v2.0/knowledgebases/e457b816-d76b-4571-b979-74a5ef293cf3',
      body,
      {
        headers: new HttpHeaders().set('Ocp-Apim-Subscription-Key', '0e60521366b7410b8096b18787e7597e'),
      }).subscribe(data => {
        // this.decodeHtml(data['answers'][0]['answer']);
        console.log('Pergunta Cadastrada!');
        this.pergunta = '';
        this.resposta = '';
        this.alertaSucesso = true;
        this.publicarQna();
      });
  }

  publicarQna() {

    this.http.put(
      'https://westus.api.cognitive.microsoft.com/qnamaker/v2.0/knowledgebases/e457b816-d76b-4571-b979-74a5ef293cf3',
      {
        headers: new HttpHeaders().set('Ocp-Apim-Subscription-Key', '0e60521366b7410b8096b18787e7597e'),
      }).subscribe(data => {
        console.log('Pergunta Publicada!');
      });

  }

}

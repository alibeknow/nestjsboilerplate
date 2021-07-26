import { Injectable } from '@nestjs/common';

import { DocumentRepository } from './document.repository';

@Injectable()
export class DocumentService {
  constructor(public readonly documentRepository: DocumentRepository) {}
  getDocuments() {
    return [
      {
        name: 'documentExample',
        uid: '2ec85ba3-fae9-46fc-bb2c-c485b5a6197d',
        body_html:
          '<xml><data>настоящим документ требует подписания тестовая инфа</data></xml>>',
        created: '2019-05-05',
      },
      {
        name: 'documentExample1',
        uid: '53325979-e974-47f5-a769-18d9be1f1258',
        body_html:
          '<xml><data>настоящим документ требует подписания тестовая инфа</data></xml>>',
        created: '2021-05-05',
      },
    ];
  }
}

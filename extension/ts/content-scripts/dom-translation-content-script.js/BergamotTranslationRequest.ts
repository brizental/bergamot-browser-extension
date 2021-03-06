/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { TranslationRequestData } from "./BergamotTranslator";
import { ContentScriptBergamotApiClient } from "../../shared-resources/ContentScriptBergamotApiClient";

/**
 * Represents a request (for 1 chunk) sent off to Bergamot's service.
 *
 * @params translationData  The data to be used for this translation,
 *                          generated by the generateNextTranslationRequest...
 *                          function.
 * @param sourceLanguage    The source language of the document.
 * @param targetLanguage    The target language for the translation.
 *
 */
export class BergamotTranslationRequest {
  public translationRequestData: TranslationRequestData;
  private sourceLanguage: string;
  private targetLanguage: string;
  public characterCount: number;

  constructor(
    translationRequestData: TranslationRequestData,
    sourceLanguage: string,
    targetLanguage: string,
  ) {
    this.translationRequestData = translationRequestData;
    this.sourceLanguage = sourceLanguage;
    this.targetLanguage = targetLanguage;
    this.translationRequestData.texts.forEach(text => {
      this.characterCount += text.length;
    });
  }

  /**
   * Initiates the request
   */
  async fireRequest(bergamotApiClient: ContentScriptBergamotApiClient) {
    return bergamotApiClient.sendTranslationRequest(
      this.translationRequestData.texts,
      this.sourceLanguage,
      this.targetLanguage,
    );
  }
}

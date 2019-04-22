package com.vtblockchain.mobile.actions.attend

/**
 * Copyright 2013-present memtrip LTD.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import com.memtrip.eos.abi.writer.*

@Abi
data class AttendArgs (
    val actor : String,
    val user: String,
    val xval: Float,
    val yval: Float,
    val crn: Long
) {
    val getActor : String
        @AccountNameCompress get() = user

    val getUser: String
        @AccountNameCompress get() = user

    val getXVal: Float
        @FloatCompress get() = xval

    val getYVal: Float
        @FloatCompress get() = yval

    val getCRN: Long
        @LongCompress get() = crn
}